import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientService } from '../services/client.service';
import { ClientDto } from '../../../package/dto/client.dto';

@ApiTags('Client')
@ApiBearerAuth()
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
