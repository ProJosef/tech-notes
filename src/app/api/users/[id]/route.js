import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Users from '@/models/Users';
import Notes from '@/models/Notes';
import bcrypt from 'bcrypt';

// GET single user by ID
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const user = await Users.findById(id).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT (Update user)
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { username, password, role, active } = await req.json();

    if (!username || !role || active === undefined) {
      return NextResponse.json(
        { error: 'All fields except password are required' },
        { status: 400 }
      );
    }

    const user = await Users.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const duplicate = await Users.findOne({ username });
    if (duplicate && duplicate?._id.toString() !== id) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }

    user.username = username;
    user.role = role;
    user.active = active;
    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      user.password = hashedPass;
    }
    const updatedUser = await user.save();
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE (Delete user)
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const note = await Notes.findOne({ user: id });
    if (note) {
      return NextResponse.json({ error: 'User has assigned notes' }, { status: 400 });
    }

    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
