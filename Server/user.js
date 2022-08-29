var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var users = { Aragog: 'aragog123' };
var usersDetails = [
  {
    username: 'Aragog',
    password: 'aragog123',
    email: 'filip.vasic2000@gmail.com',
    firstName: 'Filip',
    lastName: 'Vasic',
    city: 'Koceljeva',
    country: 'Srbija',
    zip: 15220,
    age: 22,
    gender: 'Male',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  }
];
var wallets = [{
  user: 'Aragog',
  usd: 50.0,
  cryptos: [
    {
      "cryptoID": "dogecoin",
      "crypto": 506.60073264777367
    },
    {
      "cryptoID": "ethereum",
      "crypto": 3.06207
    },
    {
      "cryptoID": "bitcoin",
      "crypto": 0.02
    }
  ]
}];

router.get('/', (req, res) => {
  return res.status(200).json(users);
});

router.get('/wallets', (req, res) => {
  return res.status(200).json(wallets);
});

router.post('/login', (req, res) => {
  var user = req.body;
  if (users[user.username] && users[user.username] === user.password) {
    res.json({
      msg: 'Successfully logged in',
      token: jwt.sign({ user: user.username }, 'SECRET'),
      username: user.username
    });
  } else {
    res.status(400).json({ msg: 'Invalid username or password' });
  }
});

router.post('/register', (req, res) => {
  var user = req.body;
  if (users[user.username]) {
    res.status(400).json({ msg: 'User already exists, please login.' });
  } else {
    users[user.username] = user.password;
    usersDetails.push(user)
    wallets.push(
      {
        user: user.username,
        usd: 0.0,
        cryptos: []
      }
    )
    res.json({
      msg: 'Successfully created user, please login'
    });
  }
});

router.get('/userInfo/:username', (req, res) => {
  let userUsername = req.params.username;
  const foundUser = usersDetails.find(user => user.username == userUsername)
  if (foundUser) {
    res.json(foundUser);
  } else {
    return res.status(400).json({ msg: 'User with username ' + userUsername + ' not found.' })
  }
});

router.patch('/changePassword/:username', (req, res) => {
  let username = req.params.username;

  let foundPassword = users[username]

  if (foundPassword) {

    if (foundPassword !== req.body.currentPassword)
      return res.status(400).json({ msg: 'Wrong current password. Try again' })

    if (req.body.newPassword !== req.body.newPasswordConfirmation)
      return res.status(400).json({ msg: 'Confirmation and new password are different. Try again' })

    foundPassword = req.body.newPassword

    return res.status(200).json({ msg: 'Successfully changed password' });
  }

  return res.status(400).json({ msg: 'Movie with name ' + movieName + ' not found.' });
});

router.patch('/wallet/buy', (req, res) => {
  let info = req.body;

  const foundWallet = wallets.find((wallet) => wallet.user == info.username);

  if (foundWallet) {

    if (foundWallet.usd - info.usdValue < 0)
      return res.status(400).json({ msg: 'You don\'t have enough usd for this transaction' })

    foundWallet.usd -= info.usdValue

    const foundCurr = foundWallet.cryptos.find(c => c.cryptoID == info.cryptoID)

    if (foundCurr) {
      foundCurr.crypto += info.cryptoValue
    } else {
      foundWallet.cryptos.push({
        cryptoID: info.cryptoID,
        crypto: info.cryptoValue
      });
    }
    return res.status(200).json({ msg: 'Successfully transaction' });
  }

  return res.status(400).json({ msg: 'Transaction failed' });
});

router.patch('/wallet/sell', (req, res) => {
  let info = req.body;

  const foundWallet = wallets.find((wallet) => wallet.user == info.username);

  if (foundWallet) {

    const foundCurr = foundWallet.cryptos.find(c => c.cryptoID == info.cryptoID)

    if (foundCurr) {

      if (foundCurr.crypto - info.cryptoValue < 0)
        return res.status(400).json({ msg: 'You don\'t have enough crypto for this transaction' })

      foundCurr.crypto -= info.cryptoValue
      foundWallet.usd += info.usdValue

      if (foundCurr.crypto <= 0.000001) {
        foundWallet.cryptos = foundWallet.cryptos.filter(c => c.cryptoID !== foundCurr.cryptoID)
      }

      return res.status(200).json({ msg: 'Successfully transaction' });
    } else {
      return res.status(400).json({ msg: 'You have not this crypto in wallet' })
    }
  }

  return res.status(400).json({ msg: 'Transaction failed' });
});


router.get('/wallet/:username', (req, res) => {
  let userUsername = req.params.username;
  const foundWallet = wallets.find(wallet => wallet.user == userUsername)
  if (foundWallet) {
    res.status(200).json(foundWallet);
  } else {
    return res.status(400).json({ msg: 'Failed' })
  }
});

router.patch('/wallet/deposit', (req, res) => {
  let info = req.body;

  const foundWallet = wallets.find((wallet) => wallet.user == info.username);

  //implementacija samo za potrebe projekta, da se demonstriraju osnovne funkcionalnosti na frontendu
  if (foundWallet) {
    foundWallet.usd += info.usd
    return res.status(200).json({ msg: 'Transaction successfull'})
  }

  return res.status(400).json({ msg: 'Transaction failed' });
});

router.patch('/wallet/withdraw', (req, res) => {
  let info = req.body;

  const foundWallet = wallets.find((wallet) => wallet.user == info.username);

  if (foundWallet) {
    if (foundWallet.usd < info.usd) 
      return res.status(400).json({ msg: 'Transaction failed: You don\'t have enough money in wallet'})
    
    //implementacija samo za potrebe projekta, da se demonstriraju osnovne funkcionalnosti na frontendu
    foundWallet.usd -= info.usd
    return res.status(200).json({ msg: 'Transaction successfull'})
  }

  return res.status(400).json({ msg: 'Transaction failed' });
});

module.exports = router;