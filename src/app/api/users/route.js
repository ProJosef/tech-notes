import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Users from '@/models/Users';
import bcrypt from 'bcrypt';

// GET all users
export async function GET(req) {
  try {
    await connectDB();

    const users = await Users.find().select('-password');
    if (!users?.length) {
      return NextResponse.json({ error: 'No users found' }, { status: 404 });
    }
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST (Create new user)
export async function POST(req) {
  try {
    await connectDB();

    const { username, password, role } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const duplicate = await Users.findOne({ username });
    if (duplicate) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ username, password: hashedPass, role });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
