import { test, expect, describe } from '@jest/globals';
import CsvHelper from '../helper/csvHelper';
import config from '../core/config';

describe('Test for reading csv file from url', () => {
	test('check book output is in proper format', async () => {
		const book = await CsvHelper.readCsvFile(config.csvUrl.books);
		const keys = Object.keys(book[0]);
		expect(keys).toEqual(['title', 'isbn', 'authors', 'description']);
	});
	test('check magazine output is in proper format', async () => {
		const magazine = await CsvHelper.readCsvFile(config.csvUrl.magazines);
		const keys = Object.keys(magazine[0]);
		expect(keys).toEqual(['title', 'isbn', 'authors', 'publishedAt']);
	});
	test('check author output is in proper format', async () => {
		const author = await CsvHelper.readCsvFile(config.csvUrl.authors);
		const keys = Object.keys(author[0]);
		expect(keys).toEqual(['email', 'firstname', 'lastname']);
	});
});
