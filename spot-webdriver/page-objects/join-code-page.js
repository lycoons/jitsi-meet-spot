const constants = require('../constants');
const PageObject = require('./page-object');

const JOIN_CODE_VIEW = '[data-qa-id=join-code-view]';
const JOIN_CODE_INPUT = '[data-qa-id=join-code-input]';
const SUBMIT_BUTTON = '[data-qa-id=join-code-submit]';

/**
 * A page object for interacting with the join code entry view of Spot-Remote.
 */
class JoinCodePage extends PageObject {
    /**
     * Initializes a new {@code JoinCodePage} instance.
     *
     * @inheritdoc
     */
    constructor(driver) {
        super(driver);

        this.rootSelector = JOIN_CODE_VIEW;
    }

    /**
     * Enters a join code and attempts to submit it.
     *
     * @param {string} code - The code to be entered.
     * @returns {void}
     */
    submitCode(code) {
        this.waitForElementDisplayed(JOIN_CODE_INPUT);

        Array.prototype.forEach.call(code, character => {
            this.driver.keys(character);
        });

        const submitButton = this.waitForElementDisplayed(SUBMIT_BUTTON);

        submitButton.click();
    }

    /**
     * Proceeds directly to the join code view of Spot-Remote.
     *
     * @param {Map} [queryParams] - Additional parameters to append to the join
     * code url.
     * @returns {void}
     */
    visit(queryParams) {
        let joinCodePageUrl = constants.JOIN_CODE_ENTRY_URL;

        if (queryParams) {
            joinCodePageUrl += '?';

            for (const [ key, value ] of queryParams) {
                joinCodePageUrl += `${key}=${value}&`;
            }
        }

        this.driver.url(joinCodePageUrl);
        this.waitForVisible();
    }
}

module.exports = JoinCodePage;
