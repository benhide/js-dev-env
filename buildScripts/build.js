/*eslint-disable no-console*/
import webpack from "webpack";
import webpackConfig from "../webpack.config.prod";
import chalk from "chalk";

process.env.NODE_ENV = "production";

console.log(
  chalk.blue(
    "Generating minified bundle for production. This will take a momonet..."
  )
);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // Fatal error, stop!!
    console.log(chalk.red(err));
    return 1;
  }
  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow("Webpack generated the following warnings: "));
  }

  console.log(`Webpack stats: ${stats}`);

  // If we got this far, the build succeeded
  console.log(
    chalk.green(
      "The app has been built for production and written to the /dist folder!"
    )
  );

  return 0;
});
