const utils = require("./utils")


const fetcher = require("../api/fetcher")
jest.mock("../api/fetcher")
describe("utils.translateDate", () => {
    test("translateDate-en", () => {
        let result = utils.translateDate("2022-08-05", "en")
        expect(result).toBe("Friday, August 5, 2022")
    })

    test("translateDate-fr", () => {
        let result = utils.translateDate("2022-08-05", "fr")
        expect(result).toBe("vendredi 5 août 2022")
    })

    test("translateDate-zh", () => {
        let result = utils.translateDate("2022-08-05", "zh")
        expect(result).toBe("2022年8月5日星期五")
    })

    test("translateDate-hi", () => {
        let result = utils.translateDate("2022-08-05", "hi")
        expect(result).toBe("शुक्रवार, 5 अगस्त 2022")
    })

    test("translateDate-es", () => {
        let result = utils.translateDate("2022-08-05", "es")
        expect(result).toBe("viernes, 5 de agosto de 2022")
    })

    test("translateDate-ar", () => {
        let result = utils.translateDate("2022-08-05", "ar")
        expect(result).toBe("الجمعة، ٥ أغسطس ٢٠٢٢")
    })
})


describe("utils.addDefaultSrc", () => {
    test("addDefaultSrc-0", () => {
        let param1 = { target: { src: "http://placeimg.com/640/480" } }
        let result = utils.addDefaultSrc(param1)
        expect(result).toBe(undefined)
        expect(param1).toEqual({ target: { src: "https://wallpaperaccess.com/full/659142.jpg", alt: "Image Could Not Be Loaded" } })
    })

    test("addDefaultSrc-1", () => {
        let param1 = { target: { src: "" } }
        let result = utils.addDefaultSrc(param1)
        expect(result).toBe(undefined)
        expect(param1).toEqual({ target: { src: "https://wallpaperaccess.com/full/659142.jpg", alt: "Image Could Not Be Loaded" } })
    })

    test("addDefaultSrc-2", () => {
        let callFunction = () => {
            utils.addDefaultSrc(undefined)
        }

        expect(callFunction).toThrow("Cannot read properties of undefined (reading 'target')" || "Cannot read property 'target' of undefined")
    })
})

describe("utils.createCanTextToSpeechMap", () => {
    test("createCanTextToSpeechMap-0", () => {
        let param1 = [{ default: false, lang: "fr-FR", localService: false, name: "Google français", voiceURI: "Google français" }, { default: true, lang: "en-US", localService: true, name: "Microsoft David - English (United States)", voiceURI: "Microsoft David - English (United States)" }]
        let result = utils.createCanTextToSpeechMap(param1)
        expect(result).toMatchObject({})
        expect(result.has("fr")).toBe(true)
        expect(result.has("en")).toBe(true)
        expect(result.has("az")).toBe(false)
    })

    test("createCanTextToSpeechMap-6", () => {
        let result = utils.createCanTextToSpeechMap([])
        expect(result).toMatchObject({})
    })
})

describe("utils.getCurrentVoice", () => {
    test("getCurrentVoice", () => {
        let param2 = [{ default: false, lang: "fr-FR", localService: false, name: "Google français", voiceURI: "Google français" }, { default: true, lang: "en-US", localService: true, name: "Microsoft David - English (United States)", voiceURI: "Microsoft David - English (United States)" }]
        let result = utils.getCurrentVoice("en", param2)
        expect(result).toEqual({ default: true, lang: "en-US", localService: true, name: "Microsoft David - English (United States)", voiceURI: "Microsoft David - English (United States)" })
    })
})

describe("utils.formatDate", () => {
    test("formatDate-0", () => {
        let param1 = new Date("01-13-2020")
        let result = utils.formatDate(param1)
        expect(result).toBe("2020-01-13")
    })

    test("formatDate-1", () => {
        let param1 = new Date("01-01-2020")
        let result = utils.formatDate(param1)
        expect(result).toBe("2020-01-01")
    })

    test("formatDate-2", () => {
        let param1 = new Date("32-01-2020")
        let callFunction = () => {
            utils.formatDate(param1)
        }

        expect(callFunction).toThrow('Invalid time value')
    })

    test("formatDate-3", () => {
        let result = utils.formatDate(undefined)
        expect(result).toBe(undefined)
    })

    test("formatDate-4", () => {
        let result = utils.formatDate({ toISOString: () => "01-13-2020" })
        expect(result).toBe("01-13-2020")
    })
})

describe("utils.fetchAvailableLanguages", () => {
    test("Mock fetchAvailableLanguages", async () => {
        let spy = jest.spyOn(fetcher, "default")
        let object = [{ code: "en", name: "English" }, { code: "ar", name: "Arabic" }, { code: "az", name: "Azerbaijani" }, { code: "zh", name: "Chinese" }, { code: "cs", name: "Czech" }, { code: "da", name: "Danish" }, { code: "nl", name: "Dutch" }, { code: "eo", name: "Esperanto" }, { code: "fi", name: "Finnish" }, { code: "fr", name: "French" }, { code: "de", name: "German" }, { code: "el", name: "Greek" }, { code: "he", name: "Hebrew" }, { code: "hi", name: "Hindi" }, { code: "hu", name: "Hungarian" }, { code: "id", name: "Indonesian" }, { code: "ga", name: "Irish" }, { code: "it", name: "Italian" }, { code: "ja", name: "Japanese" }, { code: "ko", name: "Korean" }, { code: "fa", name: "Persian" }, { code: "pl", name: "Polish" }, { code: "pt", name: "Portuguese" }, { code: "ru", name: "Russian" }, { code: "sk", name: "Slovak" }, { code: "es", name: "Spanish" }, { code: "sv", name: "Swedish" }, { code: "tr", name: "Turkish" }, { code: "uk", name: "Ukranian" }, { code: "vi", name: "Vietnamese" }]
        spy.mockReturnValue(object)
        let result = await utils.fetchAvailableLanguages("https://libretranslate.com/languages")
        let object2 = [{ code: "en", name: "English" }, { code: "ar", name: "Arabic" }, { code: "az", name: "Azerbaijani" }, { code: "zh", name: "Chinese" }, { code: "cs", name: "Czech" }, { code: "da", name: "Danish" }, { code: "nl", name: "Dutch" }, { code: "eo", name: "Esperanto" }, { code: "fi", name: "Finnish" }, { code: "fr", name: "French" }, { code: "de", name: "German" }, { code: "el", name: "Greek" }, { code: "he", name: "Hebrew" }, { code: "hi", name: "Hindi" }, { code: "hu", name: "Hungarian" }, { code: "id", name: "Indonesian" }, { code: "ga", name: "Irish" }, { code: "it", name: "Italian" }, { code: "ja", name: "Japanese" }, { code: "ko", name: "Korean" }, { code: "fa", name: "Persian" }, { code: "pl", name: "Polish" }, { code: "pt", name: "Portuguese" }, { code: "ru", name: "Russian" }, { code: "sk", name: "Slovak" }, { code: "es", name: "Spanish" }, { code: "sv", name: "Swedish" }, { code: "tr", name: "Turkish" }, { code: "uk", name: "Ukranian" }, { code: "vi", name: "Vietnamese" }]
        expect(result).toEqual(object2)
        expect(spy).toHaveBeenCalledWith("https://libretranslate.com/languages")
        spy.mockRestore()
    })
})
