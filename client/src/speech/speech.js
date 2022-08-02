/* eslint-disable no-undef */
import EasySpeech from 'easy-speech';
/* eslint-disable indent */
const initSpeech = async () => {
    try {
        // using easy speech because it handles nuances of different browsers
        const detect = EasySpeech.detect();
        // check if speechSynthesis is supported
        if (detect.speechSynthesis && detect.speechSynthesisUtterance) {
            // eslint-disable-next-line max-len
            // initialize speech, the timeout is for the speechSynthesis to load for specific browsers which load speech asyncronously
            await EasySpeech.init({ maxTimeout: 5000, interval: 250 });
            // get the voices
            return EasySpeech.status().voices;
        }
    } catch (err) {
        console.log(err);
    }
    return null;
};

export default initSpeech;
