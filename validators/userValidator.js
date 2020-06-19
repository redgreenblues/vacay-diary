module.exports = {
    validate (firstName, lastName, email, password, password2, result) {
        let errors = [];

        // Validation
        if (!firstName || !lastName || !email || !password || !password2) errors.push({ msg: 'Please fill in all the fields' });
        if (password !== password2) errors.push({ msg: 'Passwords do not match' });
        if (password.length < 8 && password.length > 0) errors.push({ msg: 'Password should be at least 8 characters' });

        return errors
    },
    validateEmail (result) {
        let errors = [];


    }
};