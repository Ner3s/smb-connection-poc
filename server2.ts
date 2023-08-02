import dotenv from "dotenv";
import SambaClient from "samba-client";
import execa from "execa";
import fs from 'fs';
dotenv.config();

const config = {
  address: `//${process.env.SERVER_IP}/${process.env.SMB_FOLDER}`,
  domain: `${process.env.SERVER_DOMAIN}`,
  username: `${process.env.SMB_USER}`,
  password: `${process.env.SMB_PASSWORD}`,
};
console.log("config", config);
const client = new SambaClient(config);

async function main() {
  try {
    // const all = await client.execute('cd', "/TESTE-FILE/ ; ls; exit");
    // console.log("res", all);

    // console.log(String(all));

    // fs.writeFile('output.txt', String(all), (err) => {
    //   if (err) throw err;
    //   console.log('The file has been saved!');
    // });

    fs.readFile('output.txt', 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }

      const firstSplit = data.split('\n');
      const secondSplit = firstSplit.map(item => {
        return item.split('  ');
      })
      const thirdSplit = secondSplit.map(item => {
        return {name: item[1], type: item[15]?.trim()}
      }).filter(item => item.name !== undefined && item.name !== '.' && item.name !== '..');

      console.log(`\n FIRST: `,firstSplit);
      console.log(`\n\n\n SECOND: `,secondSplit);
      console.log(`\n\n\n THIRD: `,thirdSplit);

      // console.log(data.split('\n'));
    });
  } catch (error) {
    return error;
  }
}

main();
