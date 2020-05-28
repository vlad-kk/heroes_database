const api = {
    get(currentPage) {
        return new Promise((resolve, reject) =>{
            fetch(`/api/heroes?currentPage=${+currentPage}`)
            .then(result => result.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
        })
    },

    create(hero) {
        return new Promise((resolve, reject) => {
            fetch("/api/heroes", {
                method: "POST",
                body: hero,
            })
            .then(result => result.json())
            .then(json => console.log(json))
            .catch(err => reject(err))
        })
    },

    update(hero, heroId) {
        return new Promise((resolve, reject) => {
            fetch(`/api/heroes/${heroId}`, {
                method: "PUT",
                body: hero,
            })
                .then(result => result.json())
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    },

    destroy(hero) {
        return new Promise((resolve, reject) => {
            fetch(`/api/heroes/${hero._id}`, {
                method: "DELETE",
            })
                .then(result => result.json())
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    },

    destroyImage(image, id){
        return new Promise((resolve, reject) => {
            fetch(`/api/heroes/${id}/image/${image}`, {
                method: "DELETE",
            })
                .then(result => result.json())
                .then(json => resolve(json))
                .catch(err => reject(err))
        })
    }
};

export default api