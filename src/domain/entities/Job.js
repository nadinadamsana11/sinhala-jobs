/**
 * Job Entity.
 */

export class Job {
    constructor({
        id,
        title,
        companyName,
        companyId,
        location,
        type, // Full-time, Part-time, Contract, Remote
        salaryRange,
        description,
        requirements,
        benefits,
        postedAt,
        deadline,
        category,
        applicantCount = 0
    }) {
        this.id = id;
        this.title = title;
        this.companyName = companyName;
        this.companyId = companyId;
        this.location = location;
        this.type = type;
        this.salaryRange = salaryRange;
        this.description = description;
        this.requirements = requirements;
        this.benefits = benefits;
        this.postedAt = postedAt;
        this.deadline = deadline;
        this.category = category;
        this.applicantCount = applicantCount;
    }
}
