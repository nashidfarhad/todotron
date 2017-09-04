import { TokenTypes } from './tokentypes';

export class TaskToken {
	constructor(token, tokenType) {
		if (token != null)
			this.token = token;
		else
			this.token = '';

		if (tokenType != null)
			this.tokenType = tokenType;
		else
			this.tokenType = TokenTypes.NORMAL;

		if (tokenType == TokenTypes.TAG) {
			let tagTokens = token.split(':');
			this.tagName = tagTokens[0];
			this.tagValue = tagTokens[1];
		}
	}
}