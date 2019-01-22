export const accentMap = new Map([
    [["è", "é", "ê", "ë", "ē", "ė", "ę"], "e"],
    [["ÿ"], "y"],
    [["û", "ü", "ù", "ú", "ū"], "u"],
    [["î", "ï", "í", "ī", "į", "ì"], "i"],
    [["ô", "ö", "ò", "ó", "ø", "ō", "õ"], "o"],
    [["à", "á", "â", "ä", "ã", "å", "ā"], "a"],
    [["ß", "ś", "š"], "s"],
    [["ł"], "l"],
    [["ž", "ź", "ż"], "z"],
    [["ç", "ć", "č"], "c"],
    [["ñ", "ń"], "n"],
    [["È", "É", "Ê", "Ë", "Ē", "Ė", "Ę"], "E"],
    [["Ÿ"], "Y"],
    [["Û", "Ü", "Ù", "Ú", "Ū"], "U"],
    [["Î", "Ï", "Í", "Ī", "Į", "Ì"], "I"],
    [["Ô", "Ö", "Ò", "Ó", "Ø", "Ō", "Õ"], "O"],
    [["À", "Á", "Â", "Ä", "Ã", "Å", "Ā"], "A"],
    [["Ś", "Š"], "S"],
    [["Ł"], "L"],
    [["Ž", "Ź", "Ż"], "Z"],
    [["Ç", "Ć", "Č"], "C"],
    [["Ñ", "Ń"], "N"]
])

export const specialCharsMap = new Map([
    [["&"], "and"],
    [["&"], ""],
    [[" &"], ""],
    [["& "], ""],
    [["'"], ""],
    [["."], " "],
    [["/"], ""],
    [["-"], ""],
    [["-"], " "],
    [["."], ""]
])

const createRegex = (source: Map<any, any>): RegExp => {
    const dump = []
    for (const key of source.keys()) {
        dump.push(...key)
    }
    return new RegExp("[" + dump.join("") + "]", "ig")
}

export const generateAliases = (s: string): string[] => {
    const str = s.toLowerCase()
    const aliases = [str]
    const normalizedStr = str.replace(createRegex(accentMap), (match) => {
        return accentMatch(match)
    })
    if (normalizedStr !== str) {
        aliases.push(normalizedStr)
    }
    aliases.push(...alternativeSlang(aliases))
    return aliases
}

export const accentMatch = (char: string): string => {
    let newChar = ""
    accentMap.forEach((value, key) => {
        if (key.includes(char)) {
            newChar = value
        }
    })
    return newChar || char
}

const alternativeSlang = (source: string[]): string[] => {
    const output = []
    for (const sourceTerm of source) {
        specialCharsMap.forEach((value, key) => {
            const regex = RegExp("\\" + key[0], "ig")
            const newTerm = sourceTerm.replace(regex, value)
            if (newTerm !== sourceTerm && !output.includes(newTerm)) {
                output.push(newTerm)
            }
        })
    }
    return output
}
