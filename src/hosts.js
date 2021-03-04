const Datastore = require('nedb')
const hostStore = new Datastore({ filename: 'public/hosts.db', autoload: true });

export default hostStore;