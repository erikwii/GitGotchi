import { resolve } from 'path';
import { config } from 'dotenv';

/**
 * get environment variable
 */
config({ path: resolve(__dirname, '../.env') });

interface statMeter {
    meter: number,
    label: string
}

class Pet {
    readonly MIN_COMMIT_PERIOD: number = parseInt(process.env.MIN_COMMIT_PERIOD);
    readonly MIN_ISSUE_PERIOD: number = parseInt(process.env.MIN_ISSUE_PERIOD);
    readonly MIN_CODEREVIEW_PERIOD: number = parseInt(process.env.MIN_CODEREVIEW_PERIOD);
    readonly MIN_PULLREQ_PERIOD: number = parseInt(process.env.MIN_PULLREQ_PERIOD);

    name: string;
    AccountCreatedAt: Date; // Pet Birthday
    totalCommitInLastYear: number;
    lastPeriodCommits: number;
    lastPeriodIssues: number;
    lastPeriodCodeReviews: number;
    lastPeriodPullRequests: number;
    // 1 Period = 1 Week

    hungryMeter: statMeter;    // 🍪
    exploreMeter: statMeter;   // 🔭
    studyMeter: statMeter;     // 📜
    colabMeter: statMeter;     // 🌎

    cunstructor(Name: string, Birthday: Date, totalCommit: number) {
        this.name = Name;
        this.AccountCreatedAt = Birthday;
        this.totalCommitInLastYear = totalCommit;
    }

    setStatistic(commits: number, issues: number, codeReviews: number, pullRequests: number): void {
        this.lastPeriodCommits = commits;
        this.lastPeriodIssues = issues;
        this.lastPeriodCodeReviews = codeReviews;
        this.lastPeriodPullRequests = pullRequests;
        
        this.calculateHungryMeter();
        this.calculateExploreMeter();
        this.calculateStudyMeter();
        this.calculateColabMeter();
    }

    getMeter(): any {
        return {
            "hungryMeter"   : this.hungryMeter,
            "exploreMeter"  : this.exploreMeter,
            "studyMeter"    : this.studyMeter,
            "colabMeter"    : this.colabMeter
        };
    }

    calculateHungryMeter(): void {
        const meter = this.lastPeriodCommits / this.MIN_COMMIT_PERIOD;
        let label;

        if (meter == 0) {
            label = 'Starving';
        } else if (meter > 0 && meter < 0.5) {
            label = 'Hungry';
        } else if (meter >= 0.5 && meter <= 1) {
            label = "Had Enough";
        } else if (meter > 1 && meter <= 2) {
            label = "Satisfied";
        } else if (meter > 2) {
            label = "Don't have Stomach";
        }

        this.hungryMeter = {
            meter : meter,
            label : label
        }
    }

    calculateExploreMeter(): void {
        const meter = this.lastPeriodIssues / this.MIN_ISSUE_PERIOD;
        let label;

        if (meter == 0) {
            label = 'WallFlower';
        } else if (meter > 0 && meter < 0.5) {
            label = 'Less';
        } else if (meter >= 0.5 && meter <= 1) {
            label = "Had Enough";
        } else if (meter > 1 && meter <= 2) {
            label = "The Explorer";
        } else if (meter > 2) {
            label = "The Watcher";
        }

        this.exploreMeter = {
            meter : meter,
            label : label
        }
    }

    calculateStudyMeter(): void {
        const meter = this.lastPeriodCodeReviews / this.MIN_CODEREVIEW_PERIOD;
        let label;

        if (meter == 0) {
            label = 'Idle';
        } else if (meter > 0 && meter < 0.5) {
            label = 'Lazy';
        } else if (meter >= 0.5 && meter <= 1) {
            label = "Handy";
        } else if (meter > 1 && meter <= 2) {
            label = "Clever";
        } else if (meter > 2) {
            label = "Wise";
        }

        this.studyMeter = {
            meter : meter,
            label : label
        }
    }

    calculateColabMeter(): void {
        const meter = this.lastPeriodPullRequests / this.MIN_PULLREQ_PERIOD;
        let label;

        if (meter == 0) {
            label = 'Shy';
        } else if (meter > 0 && meter < 0.5) {
            label = 'Experiment';
        } else if (meter >= 0.5 && meter <= 1) {
            label = "Contributor";
        } else if (meter > 1 && meter <= 2) {
            label = "Colaborator";
        } else if (meter > 2) {
            label = "Maintainer";
        }

        this.colabMeter = {
            meter : meter,
            label : label
        }
    }
}