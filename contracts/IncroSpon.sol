pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract IncroSpon is Ownable{ 
    //string public name = 'Incro-Sponsor';

    Campaign[] campaigns;
    Sponsor[] sponsors;
    Participant[] participants;
    EventRec[] eventrecs;

    struct Campaign {
        uint256 camp_id;        // 1
        string name;            // 2
        address started_by;     // 3
        uint256 end_date;       // 4
        int32 unit_goal;        // 5
        int32 unit_so_far;      // 6
        uint256 wei_paid_out;   // 7
        uint256 wei_in_escrow;  // 8
    }

    struct Sponsor {
        address addr_spon;      // 1
        uint256 camp_id;        // 2
        address addr_part;      // 3
        address addr_pay_to;    // 4
        int8 unit;              // 5
        uint256 wei_per_unit;   // 6
        uint256 wei_in_escrow;  // 7
    }

    struct Participant {
        address addr_part;      // 1
        uint256 camp_id;        // 2
        string name_part;       // 3
        int8 unit;              // 4
        int32 unit_goal;        // 5
        uint256 date_start;     // 6
        uint256 date_end;       // 7
    }

    struct EventRec {
        uint256 camp_id;        // 1
        address addr_part;      // 2
        address addr_spon;      // 3
        uint256 date_event;     // 4
        int8 unit;              // 5
        int32 qty_unit;         // 6
        uint256 wei_paid;       // 7
    }


    function getCampaignsLen() view external returns(uint256){
        return campaigns.length;
    }


    function getCampaign_rec( uint256 _camp_id ) public view returns( string, address, uint256, int32, int32, uint256, uint256 ) {
        require( _camp_id <= campaigns.length );
        Campaign memory cr = campaigns[_camp_id];
        return ( cr.name, cr.started_by, cr.end_date, cr.unit_goal, cr.unit_so_far, cr.wei_paid_out, cr.wei_in_escrow );
    }



    // function setCampaign_rec( string _mfg, string _sn) external returns(uint256 _recNum){
        //having problems with require ... getting rpc error
        // require( msg.sender == storeOwner );
        // require( (bytes(_mfg).length<=50) && (bytes(_sn).length<=50) );
        // uint256 recNum = nextRecNum++;
        //next line returns a pointer to the location to write to
        //it should automatically generate a new address based on the mapping

        //try now with constructor
        // bikeRecAll[recNum] = bikeRec( msg.sender, _mfg, _sn );
        // return recNum;
    // }   


    function getSponsorsLen() view external returns(uint256){
        return sponsors.length;
    }


    //this function will return how many sponsors for a campaign
    function getNumSponsorsForCampaign( uint256 _camp_id ) public view returns( uint256 )  {
        require( _camp_id <= campaigns.length );
        uint256 numMatches = 0;
        for(uint256 i=0; i<= sponsors.length; i++)
        {
            if (sponsors[i].camp_id == _camp_id )  numMatches++;
        }  
        return numMatches;        
    }


    function getSponsorInCampaign_rec( uint256 _camp_id, uint256 _matchNum ) 
    public view returns( string, address, uint256, int32, int32, uint256, uint256 ) {
        //this will return a matching record for a sponsor, which is the _matchNum
        // can find out the number of matching items by running the getNum function
        require( _camp_id <= campaigns.length );
        uint256 numMatches = 0;
        Campaign memory cr;
        for(uint256 i=0; i<= sponsors.length; i++)
        {
            if (sponsors[i].camp_id == _camp_id )  {
                numMatches++;
                if (numMatches == _matchNum) {
                    cr = campaigns[_camp_id];
                    break;
                }
            }
        }    
        return ( cr.name, cr.started_by, cr.end_date, cr.unit_goal, cr.unit_so_far, cr.wei_paid_out, cr.wei_in_escrow );
    }
    
    
    function getParticipantsLen() view external returns(uint256){
        return participants.length;
    }


    function getNumParticipantForCampaign( uint256 _camp_id ) public view returns( uint256 )  {
        //this function will return how many participants for a campaign
        require( _camp_id <= campaigns.length );
        uint256 numMatches = 0;
        for(uint256 i=0; i<=participants.length; i++)
        {
            if (participants[i].camp_id == _camp_id )  numMatches++;
        }  
        return numMatches;        
    }


    function getParticipantInCampaign_rec( uint256 _camp_id, uint256 _matchNum ) 
    public view returns( string, address, uint256, int32, int32, uint256, uint256 ) {
        //this will return a matching record for a participant, which is the _matchNum
        // can find out the number of matching items by running the getNum function
        require( _camp_id <= campaigns.length );
        uint256 numMatches = 0;
        Campaign memory cr;
        for(uint256 i=0; i<= participants.length; i++)
        {
            if (sponsors[i].camp_id == _camp_id )  {
                numMatches++;
                if (numMatches == _matchNum) {
                    cr = campaigns[_camp_id];
                    break;
                }
            }
        }    
        return ( cr.name, cr.started_by, cr.end_date, cr.unit_goal, cr.unit_so_far, cr.wei_paid_out, cr.wei_in_escrow );
    }


    function getEventRecsLen() view external returns(uint256){
        return eventrecs.length;
    }


    function getNumEventsForCampaign( uint256 _campID ) public view returns( uint256 )  {
        //get number of matching event records for a campaign
        require( _campID <= campaigns.length );
        uint256 numMatches = 0;
        for(uint256 i=0; i<= eventrecs.length; i++)
        {
            if ( eventrecs[i].camp_id == _campID )  numMatches++;
        }  
        return numMatches;        
    }


}
