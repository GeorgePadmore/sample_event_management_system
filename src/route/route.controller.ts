/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @ApiTags('Authentication')
  @Post('/login')
  async login() {
    return await this.routeService.login();
  }

  @ApiTags('Authentication')
  @Post('/logout')
  async logout() {
    return "Logout";//await this.routeService.login();
  }


  @ApiTags('Dashboard')
  @Get('/upcoming_events')
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routeService.create(createRouteDto);
  }

  @ApiTags('Dashboard')
  @Get('/upcoming_event_details')
  findAll() {
    return this.routeService.findAll();
  }


  
  @ApiTags('Event Management')
  @Get('/list_events')
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @ApiTags('Event Management')
  @Post('/create_event')
  createEvent(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @ApiTags('Event Management')
  @Patch('/edit_event/:id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routeService.update(+id, updateRouteDto);
  }

  @ApiTags('Event Management')
  @Delete('/delete_event/:id')
  remove(@Param('id') id: string) {
    return this.routeService.remove(+id);
  }
}
