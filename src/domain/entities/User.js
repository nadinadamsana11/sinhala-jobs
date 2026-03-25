/**
 * User Entity.
 */

export class User {
    constructor({
        uid,
        email,
        displayName,
        role, // 'candidate' or 'company'
        phoneNumber,
        photoURL,
        location,
        bio,
        skills = [],
        experience = [],
        education = [],
        website,
        companyDetails = {}
    }) {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.photoURL = photoURL;
        this.location = location;
        this.bio = bio;
        this.skills = skills;
        this.experience = experience;
        this.education = education;
        this.website = website;
        this.companyDetails = companyDetails;
    }
}
