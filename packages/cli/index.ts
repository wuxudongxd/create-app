import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import minimist from "minimist";
import prompts from "prompts";
import { yellow, green, cyan, blue, red } from "kolorist";

const argv = minimist(process.argv.slice(2), { string: ["_"] });

const cwd = process.cwd();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 初始化的框架们
 */
interface IFrameworks {
  name: string;
  color: (str: string | number) => string;
  display?: string;
  variants?: IFrameworks[];
}
const FRAMEWORKS: IFrameworks[] = [
  {
    name: "vanilla",
    color: yellow,
    variants: [
      {
        name: "vanilla-webpack",
        display: "Webpack",
        color: blue,
      },
      {
        name: "vanilla-rollup",
        display: "Rollup",
        color: red,
      },
      {
        name: "vanilla-node",
        display: "Node",
        color: green,
      },
    ],
  },
  {
    name: "vue",
    color: green,
    variants: [
      {
        name: "vue-javascript",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "vue-typescript",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
  {
    name: "react",
    color: cyan,
    variants: [
      {
        name: "react-javascript",
        display: "JavaScript",
        color: yellow,
      },
      {
        name: "react-typescript",
        display: "TypeScript",
        color: blue,
      },
    ],
  },
];

/**
 * 模板名称数组
 */
const TEMPLATES = FRAMEWORKS.map(
  (f) => f?.variants?.map((v) => v.name) || [f.name]
).reduce((a, b) => a.concat(b), []);

/**
 * 防止 .gitignore 干扰
 */
const renameFiles: { [id in string]: string } = {
  _gitignore: ".gitignore",
};

async function init() {
  // argv._ contains all the arguments that didn't have an option associated with them.
  // npm init app 项目名
  // targetDir 就是上边的项目名
  let targetDir = argv._[0];
  // yarn create vite my-vue-app --template vue
  let template = argv.template || argv.t;

  const defaultProjectName = targetDir ?? "initial-project";

  let result: prompts.Answers<string> = {};

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : "text",
          name: "projectName",
          message: "项目名:",
          initial: defaultProjectName,
          // eslint-disable-next-line no-return-assign
          onState: (state) =>
            (targetDir = state.value.trim() || defaultProjectName),
        },
        {
          // type 路径不存在 或 路径存在且为空目录时 跳过进入下个选项
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "confirm",
          name: "overwrite",
          message: () =>
            (targetDir === "." ? "当前目录" : `目标目录 "${targetDir}"`) +
            ` 不是空目录。移除现有文件并继续？`,
        },
        {
          type: (_, { overwrite } = {} as any) => {
            if (overwrite === false) {
              throw new Error(red("✖") + " 操作取消");
            }
            return null;
          },
          name: "overwriteChecker",
        },
        {
          type: () => (isValidPackageName(targetDir) ? null : "text"),
          name: "packageName",
          message: "项目包名:",
          initial: () => toValidPackageName(targetDir),
          validate: (dir) =>
            isValidPackageName(dir) || "不合适的 package.json name",
        },
        {
          type: template && TEMPLATES.includes(template) ? null : "select",
          name: "framework",
          message:
            typeof template === "string" && !TEMPLATES.includes(template)
              ? `"${template}" 不包含在仓库模板中。请从下边选择一个：`
              : "选择一个框架：",
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color;
            return {
              title: frameworkColor(framework.name),
              value: framework,
            };
          }),
        },
        {
          type: (framework) => (framework?.variants ? "select" : null),
          name: "variant",
          message: "选择一个类型：",
          choices: (framework) =>
            framework.variants.map((variant: IFrameworks) => {
              const variantColor = variant.color;
              return {
                title: variantColor(variant.name.split("-")[1]),
                value: variant.name,
              };
            }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " 操作取消");
        },
      }
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  // user choice associated with prompts
  const { framework, overwrite, packageName, variant } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  // determine template
  template = variant || framework || template;

  console.log(`\n正在 ${root} 创建脚手架项目中...`);

  const templateDir = path.join(__dirname, `packages/${template}`);

  const write = (file: string, content?: string) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter(
    (f) => !["package.json", "node_modules"].includes(f)
  )) {
    write(file);
  }

  const pkg: any = import(path.join(templateDir, `package.json`));

  pkg.name = packageName || targetDir;

  write("package.json", JSON.stringify(pkg, null, 2));

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";

  console.log(`\初始化完成！现在可以运行以下命令：\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  switch (pkgManager) {
    case "yarn":
      console.log("  yarn");
      console.log("  yarn dev");
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
  console.log();
}

function isEmpty(path: fs.PathLike) {
  return fs.readdirSync(path).length === 0;
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  );
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-");
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function pkgFromUserAgent(userAgent?: string) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

init().catch((e) => {
  console.error(e);
});
