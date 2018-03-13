let SensitiveWordMap = require("./SensitiveWordMap.js");
class SensitiveWordFilter{
	
	constructor(keyWordSet){
		this.sensitiveWordMap = new SensitiveWordMap(keyWordSet);
	}

	isContaintSensitiveWord(txt, matchType = 1){
		let flag = false;
		for(let i = 0 ; i < txt.length ; i++){
			let matchFlag = this.checkSensitiveWord(txt, i, matchType);
			if(matchFlag > 0){
				flag = true;
			}
		}
		return flag;
	}

	getSensitiveWord(txt, matchType = 1){
		let sensitiveWordList = [];
		for(let i = 0 ; i < txt.length ; i++){
			let length = this.checkSensitiveWord(txt, i, matchType);
			if(length > 0){
				sensitiveWordList.push(txt.substring(i, i + length));
				i = i + length - 1;
			}
		}
		
		return sensitiveWordList;
	}

	checkSensitiveWord(txt, beginIndex, matchType = 1){
		let flag = false,
			matchFlag = 0,
			word = 0;
		let nowMap = this.sensitiveWordMap.getSensitiveWordMap();
		for(let i = beginIndex; i < txt.length ; i++){
			word = txt[i];
			nowMap = nowMap[word];
			if(nowMap){
				matchFlag++;
				if(nowMap.isEnd){
					flag = true;
					if(SensitiveWordFilter.MIN_MATCH_TYPE == matchType){
						break;
					}
				}
			} else {
				break;
			}
		}
		if(matchFlag < 2 || !flag){
			matchFlag = 0;
		}
		return matchFlag;
	}

	replaceSensitiveWord(txt, matchType = 1, replaceChar = "*"){
		let resultTxt = txt,
			set = this.getSensitiveWord(txt, matchType),
			word = null,
			replaceString = null;
		while (set.length) {
			word = set.shift();
			replaceString = this.getReplaceChars(replaceChar, word.length);
			resultTxt = resultTxt.replace(new RegExp(word, "g"), replaceString);
		}
		
		return resultTxt;
	}

	getReplaceChars(replaceChar, length){
		let resultReplace = replaceChar;
		for(let i = 1 ; i < length ; i++){
			resultReplace += replaceChar;
		}
		
		return resultReplace;
	}

}
SensitiveWordFilter.MIN_MATCH_TYPE = 1;
SensitiveWordFilter.MAX_MATCH_TYPE = 2;

module.exports = SensitiveWordFilter;