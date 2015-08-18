// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '952644968132286', // your App ID
        'clientSecret'  : '066f229f84db627478bc75d8c4e9a91f', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'DQDqgK7MaCQCOg4cpTKnLMTQu',
        'consumerSecret'    : 'NPH0BTtDXoqBJIiMFVB54PGOjPDVlobFbjEr10ZtQnFSf0xyDI',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
