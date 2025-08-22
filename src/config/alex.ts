/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import type { OptionsObject } from "alex";

/**
 * The config for Alex.
 * @see https://www.npmjs.com/package/alex#configuration
 * @see https://github.com/retextjs/retext-equality/blob/main/rules.md
 * @see https://github.com/retextjs/retext-profanities/tree/main?tab=readme-ov-file
 */
export const alexConfig: OptionsObject = {
  allow: [
    "boy-girl",
    "boyfriend-girlfriend",
    "boyfriends-girlfriends",
    "bride-groom",
    "brother-sister",
    "brothers-sisters",
    "dad-mom",
    "dads-moms",
    "daughter-son",
    "daughters-sons",
    "godfather-godmother",
    "gramps-granny",
    "granddaughter-grandson",
    "granddaughters-grandsons",
    "grandfathers-grandmothers",
    "he-she",
    "her-him",
    "herself-himself",
    "husband-wife",
    "husbands-wives",
    "stepbrother-stepsister",
    "stepbrothers-stepsisters",
  ],
};
