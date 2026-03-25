/**
 * Job Repository Implementation.
 */

import { FirestoreSource } from '../sources/FirestoreSource.js';
import { Job } from '../../domain/entities/Job.js';

export const JobRepository = {
    async getAllJobs(filters) {
        const jobsData = await FirestoreSource.queryJobs(filters);
        return jobsData.map(data => new Job(data));
    },

    async getJobById(id) {
        const data = await FirestoreSource.get('jobs', id);
        return data ? new Job(data) : null;
    },

    async createJob(jobData) {
        return await FirestoreSource.add('jobs', jobData);
    },

    async getJobsByCompany(companyId) {
        // Implementation for company dashboard
    }
};
