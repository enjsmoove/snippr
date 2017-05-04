require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.ESQL_URL);

/*
  MODELS
*/

const Snyppr = db.define('snyppr', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  fname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // s3url: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
}, {
  timestamps: false,
});
const SnypprStripe = db.define('snypprstripe', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  object: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  business_logo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  business_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  business_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  charges_enabled: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  default_currency: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  details_submitted: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  display_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  managed: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  payouts_enabled: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  statement_descriptor: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  support_email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  support_phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  timezone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
});
const Snypee = db.define('snypee', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  fname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // s3url: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
}, {
  timestamps: false,
});

const Style = db.define('style', {
  style: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
});

const Transaction = db.define('transaction', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

const Favorite = db.define('favorite', {
  snypprId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const SnypprReview = db.define('snypprreview', {
  snypprId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const SnypeeReview = db.define('snypeereview', {
  snypeeId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

/*
  RELATIONSHIPS
*/

Snyppr.hasMany(Transaction);
Snypee.hasMany(Transaction);
Transaction.belongsTo(Snyppr);
Transaction.belongsTo(Snypee);
Snyppr.hasOne(SnypprStripe);
const SnypprStyles = db.define('snypprStyles', {}, { timestamps: false });

Style.belongsToMany(Snyppr, { through: SnypprStyles });
Snyppr.belongsToMany(Style, { through: SnypprStyles });
Snypee.hasMany(Favorite);
Favorite.belongsTo(Snypee);


Snyppr.sync();
Snypee.sync();
Style.sync();
Transaction.sync();
SnypprStyles.sync();
Favorite.sync();
SnypprReview.sync();
SnypeeReview.sync();


db.authenticate()
  .then(() => {
    console.log('database connected successfully!');
  })
  .catch((err) => {
    console.log('database fucked up bro! ', err);
  });

module.exports.Snyppr = Snyppr;
module.exports.Snypee = Snypee;
module.exports.Style = Style;
module.exports.Transaction = Transaction;
module.exports.SnypprStyles = SnypprStyles;
module.exports.Favorite = Favorite;
module.exports.SnypprReview = SnypprReview;
module.exports.SnypeeReview = SnypeeReview;
