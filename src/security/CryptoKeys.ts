import crypto from 'crypto-js';

import { STORAGE_KEYS } from '../utils/Constants';
import StorageServices from "../services/StorageServices";

class CryptoKeys {
    getKeyBase() {
        const keyBase = StorageServices.getLocalStorage(STORAGE_KEYS.ENCRYPTION_KEY)

        if (!keyBase) {
            this.setEncryptionKeys()
            return  StorageServices.getLocalStorage(STORAGE_KEYS.ENCRYPTION_KEY)
        } else {            
            return keyBase
        }
    }

    setEncryptionKeys() {
        const keyBase = StorageServices.getLocalStorage(STORAGE_KEYS.ENCRYPTION_KEY)

        if (!keyBase) {
            /*
             * Create secure random encryption keys to be used
            */
            const secureKeyBase = crypto.lib.WordArray.random(23).toString()
            StorageServices.setLocalStorage(STORAGE_KEYS.ENCRYPTION_KEY, secureKeyBase)
        }
    }
}

export default new CryptoKeys()