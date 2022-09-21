const { Mandataire, Region } = require("../../models");
const SftpClient = require("./Sftp");

const sftp = new SftpClient();

function generateDate() {
  const d = new Date();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return [year, month, day, hours, minutes, seconds].join("");
}

const private_value = process.env.P5_SFTP_PRIVATE_KEY.replace(/\\n/g, "\n");

const SftpOptions = {
  host: "159.65.121.175",
  port: 22,
  privateKey: Buffer.from(private_value),
  username: "root",
};
// `P1_${generateDate()}_eMJPM_mandataire_individuel_departements.json`;
const timestamps = generateDate();

async function extractTables() {
  const mandataires = await Mandataire.query();
  const regions = await Region.query();
  return { mandataires, regions };
}

async function psExtract() {
  const data = await extractTables();

  sftp
    .connect(SftpOptions)
    .then(() => {
      const promises = Object.keys(data).map(async (tableName) => {
        return sftp.uploadFile(
          JSON.stringify(
            data[tableName]
          )`koko3_${timestamps}_eMJPM_${"tableName"}_${timestamps.slice(
            0,
            8
          )}.json`
        );
      });
      return Promise.all(promises);
    })
    .then((pro) => {
      console.log("=== pro", pro);
      console.log("uploading finished");
    })
    .catch((e) => {
      console.log("Eror occured  while uploading file", e.message);
    })
    .finally(() => {
      sftp.disconnect();
      console.log("disconnected from server");
    });
}

module.exports = psExtract;
