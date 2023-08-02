import { fstat, lstat, readdir } from "fs";
import dotenv from "dotenv";
import SMB2 from "smb2";
dotenv.config();

const config = { 
  share: `\\\\${process.env.SERVER_IP}\\${process.env.SMB_FOLDER}`,
  domain: `${process.env.SERVER_DOMAIN}`,
  username: `${process.env.SMB_USER}`,
  password: `${process.env.SMB_PASSWORD}`,
}
console.log("config", config);
const client = new SMB2(config);

function main() {
  client.readdir("TESTE-FILE", function (err, data) {
    if (err) {
      console.log("Error (readdir):\n", err);
      console.log("data", data);
    } else {
      console.log(`[CONNECTED] on Server [${process.env.SERVER_IP}]`);
      console.log(`DATA: -> `, data);
      data.forEach((file) => {
        let directories = [];
        client.readFile(`TESTE-FILE\\${file}`, function (err, data) {
          if (err) {
            console.log("Error (readFile):\n", err);
          } else {
            console.log(`[READ FILE] -> ${file}`);
            console.log(`DATA: -> `, data);
          }
        });
      });
      client.close();
    }
  });
}

main();
