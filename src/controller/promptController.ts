import inquirer from 'inquirer';
import config from '../core/config';
import CsvController from '../controller/csvController';

class PromptController {
	async initPrompt() {
		while (true) {
			const { answer } = await inquirer.prompt(
				config.consolePrompt.launchQuestion
			);
			if (answer === 'quit') {
				const confirm = await this.quitConfirmation();
				if (confirm) break;
			}
			await this.handlePromptResponse(answer);
		}
	}

	private async inputISBNPrompt(): Promise<string> {
		const { isbn } = await inquirer.prompt(
			config.consolePrompt.inputQuestion('isbn', 'Enter the isbn')
		);
		return isbn;
	}
	private async inputEmailPrompt(): Promise<string> {
		const { email } = await inquirer.prompt(
			config.consolePrompt.inputQuestion(
				'email',
				'Enter the author email'
			)
		);
		return email;
	}

	private async quitConfirmation(): Promise<boolean> {
		const { quit } = await inquirer.prompt(
			config.consolePrompt.confirmQuestion(
				'quit',
				'Are you sure, you want to quit?'
			)
		);
		return quit;
	}

	private async handlePromptResponse(answer: string) {
		switch (answer) {
			case 'list_all_books':
				await CsvController.listAllBooks();
				break;

			case 'list_all_books_sorted_title':
				await CsvController.listAllBooksSortedByTitle();
				break;

			case 'list_all_authors':
				await CsvController.listAllAuthors();
				break;

			case 'list_all_magazines':
				await CsvController.listAllMagazines();
				break;

			case 'list_all_magazines_sorted_title':
				CsvController.listAllMagazinesSortedByTitle();
				break;

			case 'print_books_magazines_sorted_title':
				await CsvController.printAllBooksAndMagazinesSortedByTitle();
				break;

			case 'find_a_book_by_isbn':
				await CsvController.findBookByISBN(
					await this.inputISBNPrompt()
				);
				break;

			case 'find_a_magazines_by_isbn':
				await CsvController.findMagazineByISBN(
					await this.inputISBNPrompt()
				);
				break;

			case 'find_all_books_by_author_email':
				await CsvController.findAllBooksByAuthorEmail(
					await this.inputEmailPrompt()
				);
				break;

			case 'find_all_magazines_by_author_email':
				await CsvController.findAllMagazinesByAuthorEmail(
					await this.inputEmailPrompt()
				);
				break;

			case 'export_single_book_magazine_to_csv':
				await CsvController.exportSingleBookAndMagazineToCsv(
					`${process.cwd()}/data/output`
				);
				break;
			default:
				break;
		}
	}
}

export default new PromptController();
