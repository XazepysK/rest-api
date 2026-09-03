const axios = require('axios');
async function deepAiChat(question, systemPrompt) {
  let chatHistory = [
    {
      "role": "user",
      "content": systemPrompt ? systemPrompt.trim() : "balas straight to the point."
    },
    {
      "role": "assistant",
      "content": "okay"
    },
    {
      "role": "user",
      "content": question
    }
  ]

  const res = await fetch("https://api.deepai.org/hacking_is_a_serious_crime", {
    "headers": {
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryByWolep_cihuy",
    },
    "referrerPolicy": "same-origin",
    "body": "------WebKitFormBoundaryByWolep_cihuy\r\nContent-Disposition: form-data; name=\"chat_style\"\r\n\r\nchat\r\n------WebKitFormBoundaryByWolep_cihuy\r\nContent-Disposition: form-data; name=\"chatHistory\"\r\n\r\n" + JSON.stringify(chatHistory) + "\r\n------WebKitFormBoundaryByWolep_cihuy\r\nContent-Disposition: form-data; name=\"model\"\r\n\r\nstandard\r\n------WebKitFormBoundaryByWolep_cihuy\r\nContent-Disposition: form-data; name=\"hacker_is_stinky\"\r\n\r\nvery_stinky\r\n------WebKitFormBoundaryByWolep_cihuy--\r\n",
    "method": "POST"
  })
    
  return await res.text()
}
module.exports = function(app) {
    app.get('/ai/deep', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: '"text" is required' });
            }
            const result = await deepAiChat(text);
            res.status(200).json({
                status: true,
                result
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
}
