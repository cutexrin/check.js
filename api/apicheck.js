export default function handler(req, res) {
  const config = {
    allowedCountries: ["IN"],
    blockedStatesIndia: ["WB", "BIHAR", "UP"],
    stateBlockEnabled: true,
    blockedMessage: "Not found your country in earth I think you other galaxy 😂",
    stateBlockedMessage: "Your state is restricted ⚠"
  };

  const country = req.query.country;
  const state = req.query.state;

  if (!country) {
    return res.status(400).json({
      allowed: false,
      message: "Country not provided"
    });
  }

  if (!config.allowedCountries.includes(country.toUpperCase())) {
    return res.status(200).json({
      allowed: false,
      message: config.blockedMessage
    });
  }

  if (
    country.toUpperCase() === "IN" &&
    config.stateBlockEnabled &&
    state &&
    config.blockedStatesIndia.includes(state.toUpperCase())
  ) {
    return res.status(200).json({
      allowed: false,
      message: config.stateBlockedMessage
    });
  }

  return res.status(200).json({
    allowed: true,
    message: "Access granted"
  });
      }
