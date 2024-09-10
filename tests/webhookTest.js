const request = require('supertest');
const app = require('./server'); // This is your express app
const stripe = require('stripe');
const Ticket = require('./models/ticket');
const sendTicketEmail = require('./email'); // Mock this if you have it

jest.mock('stripe');
jest.mock('./models/ticket');
jest.mock('./email');

describe("testing webhook")