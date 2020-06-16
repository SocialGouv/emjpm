const data = `
Tribunal d'Instance de Calais;62103;CALAIS CEDEX;+33 3 21 36 37 69;ti-calais@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Saint-Omer;62504;ST OMER CEDEX;+33 3 21 12 07 00;ti-maubeuge@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Béthune;62408;BETHUNE CEDEX;+33 3 21 63 14 30;jean-pierre.sigaud@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Boulogne-sur-Mer;62205;BOULOGNE SUR MER CEDEX;+33 3 21 33 82 22;ti-maubeuge@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Valenciennes;59307;VALENCIENNES CEDEX;+33 3 27 20 23 00;ti-valenciennes@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Douai;59508;DOUAI CEDEX;+33 3 27 99 95 95;ti-maubeuge@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Cambrai;59407;CAMBRAI CEDEX;+33 3 27 73 37 37;ti-maubeuge@justice.fr;48.858483;2.27154;;
Tribunal d'Instance d'Hazebrouck;59524;HAZEBROUCK CEDEX;+33 3 28 43 87 50;ti-hazebrouck@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Dunkerque;59377;DUNKERQUE CEDEX 1;+33 3 28 25 98 20;ti-dunkerque@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Roubaix;59100;ROUBAIX;+33 3 20 76 98 30;ti-roubaix@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Maubeuge;59607;MAUBEUGE CEDEX;+33 3 27 53 15 20;ti-maubeuge@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Tourcoing;59200;TOURCOING;+33 3 20 76 35 90;ti-maubeuge@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Charleville-Mézières;8000;CHARLEVILLE MEZIERES;+33 3 51 16 80 06;ti-charleville-mezieres@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Lens;62305;LENS CEDEX;+33 3 21 13 54 10;chg.ti-lens@justice.fr;48.858483;2.27154;;
Tribunal d'Instance d'Arras;62008;ARRAS CEDEX;+33 3 21 71 62 25;ti-arras@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Péronne;80200;PERONNE;+33 3 22 84 72 80;ti-montreuil-sur-mer@justice.fr;48.858483;2.27154;;
Tribunal d'Instance d'Amiens;80027;AMIENS CEDEX 1;+33 3 22 82 45 00;ti-montreuil-sur-mer@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Montreuil (62);62170;MONTREUIL;+33 3 21 06 06 96;ti-montreuil-sur-mer@justice.fr;48.858483;2.27154;;
Tribunal d'Instance de Lille;59021;LILLE CEDEX;+33 3 20 78 33 33;ti-lille@justice.fr;48.858483;2.27154;;
Tribunal d'Instance d'Avesnes-sur-Helpe;59363;AVESNES SUR HELPE CEDEX;+33 3 27 57 78 00;ti-calais@justice.fr;48.858483;2.27154;;
Tribunal d'Instance d'Abbeville;80103;ABBEVILLE CEDEX;+33 3 22 25 37 30;ti-calais@justice.fr;48.858483;2.27154;;`;

const cols = [
  "etablissement",
  "code_postal",
  "ville",
  "telephone",
  "email",
  "latitude",
  "longitude",
];

const splitRow = (row) =>
  row
    .split(";")
    .filter((r, i) => i < cols.length)
    .reduce((a, c, i) => ({ ...a, [cols[i]]: c }), {});

const rows = data.split("\n").filter(Boolean).map(splitRow);

exports.seed = (knex) => {
  if (process.env.NODE_ENV === "test") {
    return Promise.resolve();
  }
  return knex.batchInsert("tis", rows);
};
