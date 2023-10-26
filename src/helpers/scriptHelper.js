import { schedule } from 'node-cron';
import { notifyUsersForUpcomingEvents } from '../mypet/services/pet.service.js';

export function startCron() {
    console.log("Starting Schedule functions...");
    schedule('0 12 * * *', () => {
        notifyUsersForUpcomingEvents();
    });
  }
