import { database, storage } from '@common/Firebase';
import uuid from 'uuid';

class FirebaseAPI {
    createChild(data, folder, path, callback) {
        var newPostKey = database.ref().child(folder).push().key;
        const userRef = database.ref().child(folder + '/' + path);
        data['id'] = newPostKey
        userRef.child(newPostKey).update({ ...data })
            .then(() => callback(true, data, null))
            .catch((error) => callback(false, null, { message: error }));
    };
    getChild(folder, path, callback) {
        database.ref(folder + '/' + path).once('value')
            .then((snapshot) => {
                callback(true, snapshot.val(), null);
            })
            .catch(error => callback(false, null, error));
    };
    deleteChild(folder, path, callback) {
        database.ref(folder + '/' + path).remove()
            .then((snapshot) => {
                callback(true, snapshot, null);
            })
            .catch(error => callback(false, null, error));
    };
    // deleteTable(folder, path, callback) {
    //     database.ref(folder + '/' + path).remove()
    //         .then((snapshot) => {
    //             callback(true, snapshot.val(), null);
    //         })
    //         .catch(error => callback(false, null, error));
    // };

    uploadFile(file, path, callback) {
        var uploadTask = storage.ref().child(path + '/' + uuid.v4()).put(file.uri, { contentType: 'image/jpeg' });
        uploadTask.on(storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
                callback(false, null, error)
            }, function () {
                storage.ref().child(uploadTask.path).getDownloadURL().then(function (url) {
                    callback(true, url, null);
                })
            });
    };
    async visionUploadImages(fileUrl, callback) {
        const lables = await fetch('https://us-central1-verity-ebd35.cloudfunctions.net/api/getVisionLable?fileName=' + fileUrl);
        let lablesJson = await lables.json();
        const webs = await fetch('https://us-central1-verity-ebd35.cloudfunctions.net/api/getVisionWeb?fileName=' + fileUrl);
        let websJson = await webs.json();
        let data = await [...lablesJson, ...websJson]
        callback(true, data, null);
    };

};
export default new FirebaseAPI();