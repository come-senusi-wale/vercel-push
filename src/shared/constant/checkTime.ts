export function checkTime(pastTime: string | Date, givenPeriod: number): boolean {
    const past = new Date(pastTime);
    const now = new Date();
  
    if (isNaN(past.getTime())) {
      throw new Error('Invalid date format');
    }
  
    const diffInMilliseconds = now.getTime() - past.getTime();
    const diffInMinutes = diffInMilliseconds / (1000 * 60);
  
    return diffInMinutes >= givenPeriod;
  }