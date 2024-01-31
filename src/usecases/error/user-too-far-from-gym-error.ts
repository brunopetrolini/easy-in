export class UserTooFarFromGymError extends Error {
  constructor() {
    super('User is too far from the gym.')
    this.name = 'UserTooFarFromGymError'
  }
}
