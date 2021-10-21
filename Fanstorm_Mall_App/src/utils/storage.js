import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {
    }
})

const myStorage = {
    _storage: storage,
    save: (k, v) => {
        storage.save({
            key: k, // Note: Do not use underscore("_") in key!
            data: v,
        })
    },

    load: (k, success, error) => {
        storage.load({
            key: k,
        }).then(v => {
            console.log('【storage】.load ' + k + ' success')
            success(v)
        }).catch(err => {
            if (error) error()
            switch (err.name) {
                case 'NotFoundError':
                    break
                case 'ExpiredError':
                    break
            }
        })
    },

    remove: (k) => {
        storage.remove({
            key: k,
        })
    },
}

export default myStorage