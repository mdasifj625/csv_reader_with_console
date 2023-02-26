import { parse } from 'csv-parse';
import https from 'https';
import fs from 'fs';
import { Stream } from 'stream';

export interface Book {
	title: string;
	isbn: string;
	authors: [string];
	description: string;
}

export interface Magazines {
	title: string;
	isbn: string;
	authors: [string];
	publishedAt: string;
}

export interface Authors {
	email: string;
	firstname: string;
	lastname: string;
}

type CSVUnion = Book | Magazines | Authors;

class CSVReader {
	// read csv file based on online and local url
	async readCsvFile(url: string, online = true): Promise<CSVUnion[]> {
		const csvPromise = new Promise((resolve, reject) => {
			if (online) {
				return https
					.get(url, (stream) => {
						this.parseStreamToCsv(stream)
							.then((parsedCsv) => {
								resolve(parsedCsv);
							})
							.catch((err) => {
								reject(err);
							});
					})
					.on('error', (err) => {
						reject(err);
					});
			}
			const localStream = fs.createReadStream(url);
			this.parseStreamToCsv(localStream)
				.then((parsedCsv) => {
					resolve(parsedCsv);
				})
				.catch((err) => {
					reject(err);
				});
		});

		return (await csvPromise) as CSVUnion[];
	}

	// parse stream to array of json object
	private async parseStreamToCsv(stream: Stream): Promise<CSVUnion[]> {
		const csvParsePromise = new Promise((resolve, reject) => {
			const csvData: object[] = [];
			stream
				.pipe(parse({ delimiter: ';', columns: true }))
				.on('data', function (csvSingleRow) {
					const csvObject: any = {};
					for (const key in csvSingleRow) {
						const newKey = key.replace(/\uFEFF/g, '');
						csvObject[newKey] =
							newKey === 'authors'
								? [...csvSingleRow[key].split(',')]
								: csvSingleRow[key];
					}
					csvData.push(csvObject);
				})
				.on('end', function () {
					resolve(csvData);
				})
				.on('error', (err) => {
					reject(err);
				});
		});

		return (await csvParsePromise) as CSVUnion[];
	}

	// convert json object to csv and save to file
	convertToCsvAndSave(
		outFolderPath: string,
		fileName: string,
		jsonObjects: any[]
	) {
		if (jsonObjects.length == 0)
			throw new Error('blank array not accepted');

		const keysOfJson = Object.keys(jsonObjects[0]);

		// convert array of object to csv string
		let rawCsv = jsonObjects.map((row) => {
			return keysOfJson
				.map((fieldName) => {
					const value = row[fieldName];
					if (Array.isArray(value)) {
						return value.join(',');
					}
					return value ? value : '';
				})
				.join(';');
		});

		// attach the heading on top
		rawCsv.unshift(keysOfJson.join(';'));

		const finalCsv = rawCsv.join('\r\n');

		if (!fs.existsSync(outFolderPath)) {
			fs.mkdirSync(outFolderPath);
		}

		fs.writeFileSync(`${outFolderPath}/${fileName}`, finalCsv);
	}
}

export default new CSVReader();
