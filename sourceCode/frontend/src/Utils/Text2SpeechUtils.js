var num2words = require("num2words")

export const mouthMap = {
        "1": ["a", "e"],
        "2": ["b", "p", "m"],
        "3": ["q", "u", "w", " "],
        "4": ["c", "g", "d", "k", "n", "r", "s", "t", "y", "x", "z"],
        "5": ["t", "h", "i"],
        "6": ["l"],
        "7": ["r"],
        "8": ["o"],
        "9": ["f", "b"]
};

export function toMouth(char){
    return (
        Object.keys(mouthMap).find(mouth =>
        mouthMap[mouth].includes(char.toLowerCase())
    ) || null)
}

export function convertString(string){
        let output = ""
        for (let word of string.split(" ")){
            word = word.replace(".", "")
            word = word.replace(",", "")
            console.log(word)
            if (/^\d+$/.test(word)){
                output += num2words(word)
            }
            else {
                output += word + " "
            }
        }
        return output
}