const sessionIdToUserMap = new Map();

const setSessionIdToUser = (id,user) => {
    sessionIdToUserMap.set(id, user);
};

const getSessionIdUser = (id) => {
    return sessionIdToUserMap.get(id);
}

module.exports = {setSessionIdToUser, getSessionIdUser}