const { spawnSync } = require("child_process");

const OPTION_REGEXP = /^\-/;
const YARN_REGEXP = /yarn/;
const PACKAGE_REGEXP = /^([a-z_-]+)(@(.*))?$/

const isYarn = YARN_REGEXP.test(process.env.npm_execpath);
const npmArgs = !isYarn
  ? "run alliage:install -- {package}"
  : "alliage:install {package}";


if (process.env.npm_config_argv) {
  const packages = JSON.parse(process.env.npm_config_argv)
    .original.slice(1)
    .filter((arg) => !OPTION_REGEXP.test(arg))
    .map((package) => {
      const res = PACKAGE_REGEXP.exec(package);
      return res[1];
    });

  packages.forEach((package) => {
    spawnSync(
      process.env.npm_execpath,
      npmArgs.replace("{package}", package).split(" "),
      { stdio: "inherit" }
    );
  });
}
