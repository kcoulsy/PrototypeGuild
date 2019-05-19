const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pick = require('lodash/pick');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        tokens: [
            {
                type: {
                    type: String,
                    required: true
                },
                token: {
                    type: String,
                    required: true
                }
            }
        ],
        characterName: {
            type: String
        },
        discordTag: {
            type: String
        },
        playerClass: {
            type: String
        },
        playerRole: {
            type: String
        },
        rank: {
            type: String
        },
        professionOne: {
            type: String
        },
        professionTwo: {
            type: String
        },
        enabled: {
            type: Boolean,
            default: false
        },
        enabledBy: {
            type: mongoose.Schema.Types.ObjectId
        },
        deleted: {
            type: Boolean,
            default: false
        },
        admin: {
            type: Boolean,
            default: false
        },
        applicationJSON: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

UserSchema.methods.toJSON = function toJSON() {
    // overriding what is returned when the document is converted to json.
    // ie. if we return a json (as we do), we're going to pick out the id and email only to send
    const user = this;
    const userObject = user.toObject(); // creates an object of the user

    return pick(userObject, [
        '_id',
        'username',
        'characterName',
        'discordTag',
        'playerRole',
        'playerClass',
        'rank',
        'professionOne',
        'professionTwo',
        'enabled',
        'applicationJSON',
        'tokens',
        'admin'
    ]);
};

UserSchema.methods.createToken = function createToken(type) {
    const token = jwt
        .sign(
            {
                _id: this._id.toHexString(),
                type
            },
            process.env.JWT_SECRET
        )
        .toString();
    this.tokens = [
        {
            type,
            token
        },
        ...this.tokens
    ];

    return this.save().then(() => token);
};

UserSchema.methods.removeToken = function removeToken() {
    return this.updateOne({
        $set: {
            tokens: []
        }
    });
};

UserSchema.statics.findByToken = function findByToken(token) {
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return this.findOne({
        _id: decoded._id,
        'tokens.type': 'x-auth',
        'tokens.token': token
    });
};

UserSchema.statics.findByCredentials = function findByCredentials(
    oldUsername,
    password
) {
    const username = oldUsername.toLowerCase();
    return this.findOne({ username }).then(user => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject(err);
                }
            });
        });
    });
};

UserSchema.pre('save', function preSave(next) {
    const user = this;
    user.username = user.username.toLowerCase();
    // we don't want to rehash our hashed password.
    // in this case isModified is going from nothing to something = modified.
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};
