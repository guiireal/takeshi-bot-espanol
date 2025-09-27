const { PREFIX } = require(`${BASE_DIR}/config`);
const axios = require("axios");
const { SPIDER_API_BASE_URL, SPIDER_API_TOKEN } = require(`${BASE_DIR}/config`);
const { DangerError } = require(`${BASE_DIR}/errors`);
module.exports = {
  name: "balance",
  description: "Consulta el saldo de requests restantes de la Spider X API",
  commands: ["balance"],
  usage: `${PREFIX}balance`,
  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendSuccessReply, sendWaitReact }) => {
    await sendWaitReact();

    const response = await axios.get(
      `${SPIDER_API_BASE_URL}/saldo?api_key=${SPIDER_API_TOKEN}`
    );

    if (!response.data.success) {
      throw new DangerError(`Error al consultar saldo! ${response.message}`);
    }

    const { user, plan, requests_left, end_date } = response.data;

    const [year, month, day] = end_date.split("-");

    await sendSuccessReply(`🤖 *Saldo de la Spider X API*
      
👤 *Usuario:* ${user}
📦 *Plan:* ${plan}
🔢 *Requests restantes:* ${requests_left}
📅 *Validez del plan:* ${day}/${month}/${year}`);
  },
};
