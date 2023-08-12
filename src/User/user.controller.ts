import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Handle HTTP GET request to retrieve all users
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Handle HTTP GET request to retrieve a user by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  // Handle HTTP POST request to create a new user
  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  // Handle HTTP PATCH request to update a user by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(+id, user);
  }

  // Handle HTTP DELETE request to remove a user by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}
