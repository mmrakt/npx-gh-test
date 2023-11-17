#!/usr/bin/env node

const path = require("path");
const cac = require("cac");
const { exec, spawn } = require("child_process");
const cli = cac("lp-environment-builder");

const COMPLETE_MESSAGE_PREFIX = "\n🔥 作成が完了しました";

cli
  .command("<project>", "指定したディレクトリ名でプロジェクトを作成します")
  .option(
    "--template <name>",
    "利用するテンプレートエンジンを指定します (pug / ejs / html)",
    {
      default: "pug",
    }
  )
  .option(
    "--preprocessor <name>",
    "利用するCSSプリプロセッサを指定します (scss / css)",
    {
      default: "scss",
    }
  )
  .option("--js <name>", "利用するJSバージョンを指定します (esnext / es5)", {
    default: "esnext",
  })
  .option(
    "--pre <boolean>",
    "Firebase プレビュー環境を使用しない場合は false を指定します（true / false）",
    {
      default: "true",
    }
  )
  .option("--commit", "ローカルで生成したソースをgit-commitします。", {
    default: false,
  })
  .option(
    "--commit-msg",
    "--commitオプション利用時の、コミットメッセージを変更します",
    {
      default: "Initial commit",
    }
  )
  .option(
    "--remote <boolean>",
    "GitHub のリモートリポジトリの作成＆設定をしない場合は false を指定します（true / false）",
    {
      default: "false",
    }
  )

  .action((args, options) => {
    // exec(`sh setupRemoteRepo.sh ${args}`, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error: ${error}`);
    //     return;
    //   }
    //   console.log(`stdout: ${stdout}`);
    //   console.error(`ERROR: ${stderr}`);
    // });

    const process = spawn("bash", ["./setupRemoteRepo.sh", "-r", args], {});

    process.on("error", (err) => {
      console.error(`ERROR: ${err.message}`);
    });

    process.stderr.on("data", function (data) {
      console.log("stdout: " + data);
    });

    process.on("close", (code) => {
      if (code === 0) {
        console.log(
          `${COMPLETE_MESSAGE_PREFIX}\n\nリモートリポジトリURL: https://github.com/mmrakt/${args}.git`
        );
      } else {
        console.log(`エラーが発生しました。\n\n終了ステータス:  ${code}`);
      }
    });
  });

cli.help();
cli.parse();
