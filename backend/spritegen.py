import os
from pathlib import Path
from PyTexturePacker import Packer


def pack_test():
    # create a MaxRectsBinPacker
    packer = Packer.create(
        max_width=2048,
        max_height=2048,
        enable_rotated=False,
        atlas_format="json",
        # bg_color=0xFFFFFF00,
        trim_mode=1,  # Trim all pixels with alpha below 1
    )

    # Outputs to frontend public folder
    output_path = Path(os.getcwd()).parent / "frontend" / "public"
    packer.pack("images/", "flowers", output_path)


if __name__ == "__main__":
    pack_test()
