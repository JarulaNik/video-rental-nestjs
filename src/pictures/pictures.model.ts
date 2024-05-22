// pictures.model.ts

import { ApiProperty } from "@nestjs/swagger";

export class picturesDTO {
  @ApiProperty()
  image: any; // Здесь нужно указать тип файла
  @ApiProperty({ required: false })
  tags: string;
  @ApiProperty({ required: false })
  description: string;
}

export class fullPicturesDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  uploadDate: Date;
  @ApiProperty({ required: false })
  tags: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty()
  visibility: boolean;
}

export class putPicturesDTO {
  @ApiProperty({ required: false })
  tags: string;
  @ApiProperty({ required: false })
  description: string;
}