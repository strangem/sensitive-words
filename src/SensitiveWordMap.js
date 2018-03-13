class SensitiveWord{
	constructor(keyWordSet){
		this._sensitiveWordMap = null;
		this._addSensitiveWordToHashMap(keyWordSet);
	}

	getSensitiveWordMap(){
		return this._sensitiveWordMap;
	}

	_addSensitiveWordToHashMap(keyWordSet){
		this._sensitiveWordMap = {};
		let key, nowMap, newWorMap = null;
		for (var j = 0; j < keyWordSet.length; j++) {
			key = keyWordSet[j];
			nowMap = this._sensitiveWordMap;
			for (let i = 0; i < key.length; i++) {
				let keyChar = key[i],
					wordMap = nowMap[keyChar];
				if(wordMap){
					nowMap = wordMap;
				} else {
					newWorMap = {};
					newWorMap.isEnd = 0;
					nowMap[keyChar] = newWorMap;
					nowMap = newWorMap;
				}
				if(i == key.length - 1){
					nowMap.isEnd = 1;
				}
			}
		}
	}
}

module.exports = SensitiveWord;