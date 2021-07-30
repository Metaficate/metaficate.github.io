// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Base64.sol";

// A simple NFT test contract
contract TestNFT is ERC721 {

    uint256 tokenCount = 0;

    constructor () ERC721("TestNFT", "TESTNFT") {
    }

    function mint() public payable returns (uint256 tokenId) {
        tokenId = tokenCount;
        tokenCount = tokenCount + 1;
        super._mint(msg.sender, tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory image = Base64.encode(bytes(createImage()));

        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"',
                            'Token #', Strings.toString(tokenId),
                            '", "description":"',
                            "Description Description Description Description Description Description Description Description Description Description",
                            '", "image": "',
                            'data:image/svg+xml;base64,',
                            image,
                            '"}'
                        )
                    )
                )
            )
        );
    }

    // return github logo svg
    function createImage() public pure returns (string memory) {
        return string(
            abi.encodePacked(
                '<svg viewBox="0 0 120.78 117.79" xmlns="http://www.w3.org/2000/svg">',
                '<path className="prefix__cls-1" d="M60.39 0A60.39 60.39 0 0041.3 117.69c3 .56 4.12-1.31 4.12-2.91 0-1.44-.05-6.19-.08-11.24C28.54 107.19 25 96.42 25 96.42c-2.75-7-6.71-8.84-6.71-8.84-5.48-3.75.41-3.67.41-3.67 6.07.43 9.26 6.22 9.26 6.22 5.39 9.23 14.13 6.57 17.57 5 .55-3.9 2.11-6.56 3.84-8.07C36 85.55 21.85 80.37 21.85 57.23A23.35 23.35 0 0128.08 41c-.63-1.52-2.7-7.66.58-16 0 0 5.07-1.62 16.61 6.19a57.36 57.36 0 0130.25 0C87 23.42 92.11 25 92.11 25c3.28 8.32 1.22 14.46.59 16a23.34 23.34 0 016.21 16.21c0 23.2-14.12 28.3-27.57 29.8 2.16 1.87 4.09 5.55 4.09 11.18 0 8.08-.06 14.59-.06 16.57 0 1.61 1.08 3.49 4.14 2.9A60.39 60.39 0 0060.39 0z" />',
                '<path className="prefix__cls-2" d="M22.87 86.7c-.13.3-.6.39-1 .19s-.69-.61-.55-.91.61-.39 1-.19.69.61.54.91zM25.32 89.43c-.29.27-.85.14-1.24-.28a.92.92 0 01-.17-1.25c.3-.27.84-.14 1.24.28s.47 1 .17 1.25zM27.7 92.91c-.37.26-1 0-1.35-.52s-.37-1.18 0-1.44 1 0 1.35.51.37 1.19 0 1.45zM31 96.27a1.13 1.13 0 01-1.59-.27c-.53-.49-.68-1.18-.34-1.54s1-.27 1.56.23.68 1.18.33 1.54zM35.46 98.22c-.15.47-.82.69-1.51.49s-1.13-.76-1-1.24.82-.7 1.51-.49 1.13.76 1 1.24zM40.4 98.58c0 .5-.56.91-1.28.92s-1.3-.38-1.31-.87.56-.92 1.29-.93 1.3.39 1.3.88zM45 97.8c.09.49-.41 1-1.12 1.12s-1.35-.17-1.44-.66.42-1 1.12-1.12 1.35.17 1.44.66z" />',
                '</svg>'
            )
        );
    }
}
