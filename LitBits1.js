const messages = {
  welcome: [
    "Welcome to USSD DAI",
    "1) Create Account",
    "2) Deposit Funds",
    "3) Transfer Funds",
    "4) Check Balance",
    "5) Currency Exchange",
    "6) Import Mnemonic (Seed phrase)"
  ].join("<br>")
};

$(function() {
  let state = "init";
  let wallet;

  $("form").on("submit", function(event) {
    event.preventDefault();

    const input = $("#input").get(0).value;
    $("#input").get(0).value = "";

    if (input === "*123#" && state === "init") {
      $("#display").html(messages.welcome);
      state = "welcome";
    }

    if (state === "welcome" && input === "1") {
      wallet = ethers.Wallet.createRandom();

      $("#display").html(
        [
          "Here is your account:",
          wallet.address,
          "And your seed phrase:",
          "",
          wallet.mnemonic,
          "",
          "Write it down and store it somewhere safe!",
          "1) Back to menu"
        ].join("<br>")
      );
      state = "1-account";
    } else if (state == "1-account" && input == "1") {
      $("#display").html(messages.welcome);
      state = "welcome";
    } else if (state === "welcome" && input === "2") {
      $("#display").html(
        ["Deposit:", "Please Enter the Amount Below"].join("<br>")
      );
      state = "deposit";
    } else if (state === "deposit") {
      $("#display").html(
        [
          "Deposited:",
          "Send the following amount in DAI:",
          input,
          "To your address:",
          wallet.address
        ].join("<br>")
      );
      state = "deposited";
    }
  });
});
