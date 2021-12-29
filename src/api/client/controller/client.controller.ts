import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from '../services/client.service';
import { ClientDto } from '../../../package/dto/client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly userService: ClientService) {}

  @Post('create')
  async create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    clientDto: ClientDto,
  ) {
    return await this.userService.createClient(clientDto);
  }
}
